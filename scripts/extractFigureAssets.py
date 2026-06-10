from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "public" / "assets" / "report-figures"
DATA_PATH = ROOT / "src" / "data" / "reportFigures.json"

SOURCES = {
    "regional": {
        "path": Path(r"C:\Users\Ayodele\Downloads\Regional-Traffic-Patterns-2022 (1).pdf"),
        "report": "Regional Traffic Patterns 2021-2022",
        "figures": {
            5: [("figure-01", "Traffic Analysis District Map", "Regional Patterns", "Map of traffic analysis districts used to summarize regional traffic changes.")],
            6: [("figure-02", "2022 Average Daily Vehicle Miles Traveled", "Regional Patterns", "Map showing average daily vehicle miles traveled in thousands.")],
            7: [("figure-03", "Estimated Percent Change in VMT, 2020-2022", "Regional Patterns", "Map of estimated VMT change by district.")],
            8: [("figure-04", "Intersection Heat Map", "Intersections", "Heat map showing intersection connectivity and traffic-volume intensity.")],
            9: [("figure-05", "Regional Percent Change in VMT, 2020-2022", "Regional Patterns", "Regional map of VMT recovery after 2020.")],
            10: [("figure-06", "Annual Percent Change in VMT, 2018-2022", "Regional Patterns", "Chart of annual VMT change before, during, and after the 2020 traffic drop.")],
            11: [("figure-07", "Federal Functional Classification", "Regional Patterns", "Map of roadway functional classification in the region.")],
            13: [("figure-08", "Automatic Traffic Recorder Location Map", "Regional Patterns", "Regional map of continuous traffic count locations.")],
            14: [
                ("figure-09", "Monthly Average Daily Traffic on Principal Arterials", "Regional Patterns", "Seasonal traffic pattern chart for principal arterials."),
                ("figure-10", "Monthly Average Daily Traffic on Municipal Streets", "Regional Patterns", "Seasonal traffic pattern chart for municipal streets."),
            ],
            15: [
                ("figure-11", "Monthly Average Daily Traffic on Rural Interstate", "Regional Patterns", "Seasonal traffic pattern chart for rural interstate locations."),
                ("figure-12", "Monthly Average Daily Traffic on Urban Interstate", "Regional Patterns", "Seasonal traffic pattern chart for urban interstate locations."),
            ],
            16: [("figure-13", "Statewide Traffic Change, 2022-2023", "Regional Patterns", "Monthly and cumulative statewide traffic change chart.")],
            17: [("figure-14", "Historical ATR Annual Average Daily Traffic", "Regional Patterns", "Long-term annual traffic trend from continuous count sites.")],
            18: [("figure-15", "FAF5 Region 311 Map", "Freight", "Map of the Omaha-Council Bluffs-Fremont FAF5 freight region.")],
            19: [("figure-16", "Total Freight Flow by Mode", "Freight", "Baseline and forecast freight flow by mode for FAF Region 311.")],
            20: [("figure-17", "FAF5 Truck Segments and Centroids", "Freight", "Truck-flow network links and centroid locations for FAF Region 311.")],
            21: [("figure-18", "Daily Two-Way Truck Trips", "Freight", "Map of modeled daily two-way truck trips in the FAF region.")],
            22: [("figure-19", "2017 and 2050 Daily Two-Way Truck Trips", "Freight", "Comparison of baseline and forecast daily two-way truck trips.")],
            23: [("figure-20", "Regional Bicycle and Pedestrian Counts", "Multimodal", "Map of permanent bicycle and pedestrian count locations.")],
            24: [
                ("figure-21", "Estimated Annual Average Daily Pedestrian Volume", "Multimodal", "Chart of estimated daily pedestrian volume at permanent count locations."),
                ("figure-22", "Estimated Annual Average Daily Bicycle Volume", "Multimodal", "Chart of estimated daily bicycle volume at permanent count locations."),
            ],
            25: [("figure-23", "Strava Activity Heat Map", "Multimodal", "Aggregated Strava activity heat map.")],
            26: [("figure-24", "Public Run, Walk, and Hike Activities on Strava", "Multimodal", "Trend chart for public run, walk, and hike activities recorded on Strava.")],
            27: [("figure-25", "Public Bicycle Activities on Strava", "Multimodal", "Trend chart for public bicycle activities recorded on Strava.")],
            28: [("figure-26", "Strava Bicycle Activities by Corridor at 20th Street", "Multimodal", "Corridor comparison chart for Market to Midtown Bikeway evaluation.")],
            29: [("figure-27", "Metro Ridership by Traffic Analysis District, April 2023", "Transit", "Map of Metro ridership summarized by traffic analysis district.")],
            30: [("figure-28", "Change in Metro Ridership, April 2022-April 2023", "Transit", "Map showing year-over-year change in Metro ridership by district.")],
            31: [("figure-29", "Automated Passenger Counts Over Time", "Transit", "Trend chart of Metro automated passenger counts.")],
            32: [("figure-30", "Omaha Rapid Bus Transit System", "Transit", "Map of the ORBT system corridor.")],
            33: [("figure-31", "Bike Share Station Checkouts", "Multimodal", "Map of Heartland Bike Share station checkout activity.")],
            34: [("figure-32", "Heartland Bike Share Rider Trips, 2011-2022", "Multimodal", "Trend chart of Heartland Bike Share rider trips.")],
            35: [("figure-33", "Scooter Trips by Month, 2020-2022", "Multimodal", "Monthly scooter trips chart.")],
            36: [("figure-34", "Taxi Rides vs. TNC Rides, Omaha", "Multimodal", "Chart comparing taxicab and transportation network company rides.")],
        },
    },
    "intersections": {
        "path": Path(r"C:\Users\Ayodele\Downloads\Top-Traffic-Intersections-2022.pdf"),
        "report": "Top Traffic Intersections 2021-2022",
        "figures": {
            5: [("figure-01", "Top 50 Intersections", "Intersections", "Map of the top 50 regional intersections.")],
            6: [("figure-02", "Regional Intersection Rank", "Intersections", "Regional map of ranked intersections.")],
        },
    },
    "interchanges": {
        "path": Path(r"C:\Users\Ayodele\Downloads\Top-Traffic-Interchanges-2022.pdf"),
        "report": "Top Traffic Interchanges 2021-2022",
        "figures": {
            4: [("figure-01", "Regional Interchange Rank", "Interchanges", "Regional map of ranked interchanges.")],
        },
    },
}


def slug(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")


def main() -> None:
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    figures = []

    for source_key, source in SOURCES.items():
        reader = PdfReader(str(source["path"]))
        for page_number, metadata_items in source["figures"].items():
            page = reader.pages[page_number - 1]
            images = [
                image for image in page.images
                if len(image.data or b"") > 50000 and not image.name.lower().endswith(".jpg")
            ]
            if not images and page.images:
                images = [max(page.images, key=lambda image: len(image.data or b""))]

            if len(images) < len(metadata_items):
                images = sorted(page.images, key=lambda image: len(image.data or b""), reverse=True)[: len(metadata_items)]

            for image, (figure_id, title, category, alt) in zip(images, metadata_items):
                ext = Path(image.name).suffix.lower() or ".png"
                filename = f"{source_key}-{figure_id}-{slug(title)}{ext}"
                (ASSET_DIR / filename).write_bytes(image.data)
                figures.append(
                    {
                        "id": f"{source_key}-{figure_id}",
                        "report": source["report"],
                        "page": page_number,
                        "figure": figure_id.replace("figure-", "Figure "),
                        "title": title,
                        "category": category,
                        "src": f"./assets/report-figures/{filename}",
                        "alt": alt,
                        "sourceStatus": "extracted embedded figure image from source PDF",
                    }
                )

    DATA_PATH.write_text(json.dumps(figures, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(figures)} figure assets.")


if __name__ == "__main__":
    main()

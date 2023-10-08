import requests
import json
import time
from bson import json_util
import threading
from dotenv import load_dotenv
import os
import datetime
from bs4 import BeautifulSoup
import re

load_dotenv()  # take environment variables from .env.

file_path = "countryStat.json"
threshold_seconds = 3600  # 1 hour threshold

country_mapping = {
    "Algeria": "ag",
    "Angola": "ao",
    "Benin": "bj",
    "Botswana": "bw",
    "Burkina Faso": "bf",
    "Burundi": "bi",
    "Cabo Verde": "cv",
    "Cameroon": "cm",
    "Central African Republic": "cf",
    "Chad": "td",
    "Comoros": "km",
    "Congo": "cg",
    "Democratic Republic of the Congo": "cd",
    "Djibouti": "dj",
    "Egypt": "eg",
    "Equatorial Guinea": "gq",
    "Eritrea": "er",
    "Eswatini": "sz",
    "Ethiopia": "et",
    "Gabon": "ga",
    "Gambia": "gm",
    "Ghana": "gh",
    "Guinea": "gn",
    "Guinea-Bissau": "gw",
    "Ivory Coast": "ci",
    "Kenya": "ke",
    "Lesotho": "ls",
    "Liberia": "lr",
    "Libya": "ly",
    "Madagascar": "mg",
    "Malawi": "mw",
    "Mali": "ml",
    "Mauritania": "mr",
    "Mauritius": "mu",
    "Morocco": "ma",
    "Mozambique": "mz",
    "Namibia": "na",
    "Niger": "ne",
    "Nigeria": "ng",
    "Rwanda": "rw",
    "Sao Tome and Principe": "st",
    "Senegal": "sn",
    "Seychelles": "sc",
    "Sierra Leone": "sl",
    "Somalia": "so",
    "South Africa": "za",
    "South Sudan": "ss",
    "Sudan": "sd",
    "Tanzania": "tz",
    "Togo": "tg",
    "Tunisia": "tn",
    "Uganda": "ug",
    "Western Sahara": "eh",
    "Zambia": "zm",
    "Zimbabwe": "zw"
}


# collection_name = os.getenv("collection_name")

def all_year_energy_data_handler(input_json):
    try:
        country_name = input_json.get("country", "")
        api_url = "https://api.iea.org/ghg?COUNTRY={}&CODE_PRODUCT=COAL,WASTEBIO,GAS,OIL&CODE_FLOW=GHGFUEL".format(
            country_name)
        response_data = requests.get(url=api_url)
        output_json = response_data.json()
        response = dict(total_ghg_emission=output_json)
        return response
    except Exception as e:
        print("Error : ", e)


def energy_data_handler(input_json):
    try:
        country_name = input_json.get("country", "")
        year = input_json.get("year", "")
        green_house_data_response = fetch_green_house_gas_emission_data_country_year_wise(country_name, year)
        energy_supply_data_response = fetch_energy_supply_data_country_year_wise(country_name, year)
        ghg_emission, total_energy_emission = filter_emission_data(energy_supply_data_response)
        # filter_emission_data(energy_supply_data_response)
        response = dict(green_house_data=green_house_data_response, total_energy_supply=total_energy_emission,
                        ghg_emission_supply=ghg_emission)
        return response
    except Exception as e:
        print("Error : ", e)


def filter_emission_data(input_json):
    try:
        ghg_emission = []
        total_energy_emission = []
        for data in input_json:
            # print(data)
            if data["CODE_FLOW"] == "TES":
                total_energy_emission.append(data)
            else:
                ghg_emission.append(data)

        return ghg_emission, total_energy_emission
    except Exception as e:
        print("Error: ", e)


def fetch_green_house_gas_emission_data_country_year_wise(country_name="Algeria", year="2021"):
    try:
        api_url = "https://api.iea.org/ghg?COUNTRY={}&TIME={}&CODE_PRODUCT=TOTAL&CODE_FLOW=GHGFUEL,CO2TES,CO2GDPPP,CO2POP".format(
            country_name, year)
        response_data = requests.get(url=api_url)
        output_json = response_data.json()
        # print("Output Json : ", output_json)
        return output_json
    except Exception as e:
        print("Error: ", e)


def fetch_energy_supply_data_country_year_wise(country_name="Algeria", year="2021"):
    try:
        api_url = "https://api.iea.org/ghg?COUNTRY={}&TIME={}&CODE_PRODUCT=MTOTSOLID,COMRENEW,NATGAS,MTOTOIL,NUCLEAR,RENE,COAL,GAS,OIL,WASTEBIO&CODE_FLOW=TES,GHGFUEL".format(
            country_name, year)
        response_data = requests.get(url=api_url)
        output_json = response_data.json()
        # print("Output Json : ", output_json)
        return output_json
    except Exception as e:
        print("Error: ", e)


def country_geo_stat_data(input_json):
    try:
        country_name = input_json.get("country", "")
        print("Country : ", country_name)
        # Get the last modified time of the file
        if os.path.exists(file_path):
            file_modification_time = os.path.getmtime(file_path)
            current_time = datetime.datetime.now().timestamp()

            # time difference in seconds
            time_difference = current_time - file_modification_time
            if time_difference <= threshold_seconds:
                # agar file threshold limit ke andar hai toh, fetching data from the file
                with open(file_path, 'r') as json_file:
                    data = json.load(json_file)  # Use json.load() to parse the JSON data into a Python data structure
                    stats_data = data[country_name]
                print("Data fetched from the existing file:")
                print(stats_data)
                return stats_data
            else:
                # file agar threshold limit cross karti hai toh delete karke new file create kar raha hu
                stats_data = africa_country_stats_data(country_name)
                os.remove(file_path)
                update_stat_json_file()
                return stats_data
        else:
            # agar file exist nahi karti hai toh, creating the file
            stats_data = africa_country_stats_data(country_name)
            update_stat_json_file()
            print("File created.")
            return stats_data

    except Exception as e:
        print(e)


def update_stat_json_file():
    try:
        t1 = threading.Thread(target=insert_countries_stat_file)
        t1.daemon = True
        t1.start()
    except Exception as e:
        print(e)


def insert_countries_stat_file():
    try:
        with open(file_path, 'w') as json_file:
            stat_dict = {}
            for countryName in country_mapping:
                stat_data = africa_country_stats_data(countryName)
                stat_dict[countryName] = stat_data
            json.dump(stat_dict, json_file, indent=4)
        print("File deleted and recreated.")
    except Exception as e:
        print(e)


def is_number_string(s):
    try:
        float(s)
        return True
    except ValueError:
        return False


def africa_country_stats_data(country_name):
    try:
        if country_name not in country_mapping:
            return []
        url = "https://data.un.org/en/iso/{}.html".format(country_mapping[country_name])

        r = requests.get(url)
        if r.status_code == 200:
            soup = BeautifulSoup(r.text, 'html.parser')

        frst_lst = []
        tables = soup.select("table.pure-table")
        for table in tables:
            rows = table.select("tr.pure-table,tr.pure-table-odd")
            for row in rows:
                td = row.select("td")
                for t in td:
                    for sup in t.find_all('sup'):
                        sup.extract()
                if len(td) == 3 and td[0].get_text() != "2010":
                    pair = [td[0].get_text(), td[2].get_text()]
                    frst_lst.append(pair)
                else:
                    for i in range(0, len(td), 4):
                        if td[i].get_text() == "":
                            continue
                        pair = [td[i].get_text(), td[i + 3].get_text()]
                        frst_lst.append(pair)
        unique = []
        dict_list = []
        [unique.append(item) for item in frst_lst if item not in unique]
        pattern = r'^\d.*\d$'
        field_list = ["Population (000, 2021)", "Pop. density (per km2, 2021)", "Surface area (km2)", "Capital city ",
                      "Sex ratio (m per 100 f)", "GDP: Gross domestic product (million current US$)",
                      "UN membership date ", "National currency ", "Exchange rate (per US$)",
                      "GDP growth rate (annual %, const. 2015 prices)", "GDP per capita (current US$)",
                      "Population growth rate (average annual %)", "Urban population (% of total population)",
                      "Fertility rate, total (live births per woman)",
                      "Life expectancy at birth (females/males, years)",
                      "Infant mortality rate (per 1 000 live births)", "Threatened species (number)",
                      "Forested area (% of land area)", "Energy supply per capita (Gigajoules)",
                      "Important sites for terrestrial biodiversity protected (%)"]
        for item in unique:
            item[0] = item[0].replace("\xa0", " ")
            item[1] = item[1].replace("       ", " ")
            item[1] = item[1].replace("      ", " ")
            item[1] = item[1].replace("  ", " ")
            if re.match(pattern, item[1]):
                item[1] = item[1].replace(" ", "")

        for item in unique:
            if item[0] in field_list:
                my_dict = {"field_name": item[0], "field_value": item[1]}
                dict_list.append(my_dict)

        return dict_list

    except Exception as e:
        print(e)

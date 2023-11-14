import requests
import json
import csv
import time

jsonFilePath = "files/ghgEmission.json"
csvFilePath = "files/ghgEmission.csv"
all_country_year_data_list = []

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


def insert_countries_stat_file(input_json):
    try:
        with open(jsonFilePath, 'w') as json_file:
            stat_dict = dict()
            stat_dict["ghg_details"] = input_json
            json.dump(stat_dict, json_file, indent=4)
    except Exception as e:
        print(e)


def json_to_csv():
    try:
        with open(jsonFilePath) as json_file:
            data = json.load(json_file)

        ghg_data = data['ghg_details']
        data_file = open(csvFilePath, 'w', newline='')
        csv_writer = csv.writer(data_file)
        count = 0
        for ghg in ghg_data:
            if count == 0:
                header = ghg.keys()
                csv_writer.writerow(header)
                count += 1

            csv_writer.writerow(ghg.values())

        data_file.close()
    except Exception as e:
        print(e)


def format_response_json(input_json):
    try:
        formatted_json = {
            "Biofuels and waste": None,
            "Coal, peat and oil shale": None,
            "Oil": None,
            "Natural gas": None,
        }
        for data in input_json:
            if data["PRODUCT"] == "Oil":
                formatted_json["Oil"] = data["VALUE"]

            if data["PRODUCT"] == "Coal, peat and oil shale":
                formatted_json["Coal, peat and oil shale"] = data["VALUE"]

            if data["PRODUCT"] == "Natural gas":
                formatted_json["Natural gas"] = data["VALUE"]

            if data["PRODUCT"] == "Biofuels and waste":
                formatted_json["Biofuels and waste"] = data["VALUE"]

        return formatted_json
    except Exception as e:
        print("Error : ", e)


def fetch_green_house_emission_data(country_name="Algeria", year="2021"):
    try:
        api_url = "https://api.iea.org/ghg?COUNTRY={}&TIME={}&CODE_PRODUCT=MTOTSOLID,COMRENEW,NATGAS,MTOTOIL,NUCLEAR,RENE,COAL,GAS,OIL,WASTEBIO&CODE_FLOW=GHGFUEL".format(
            country_name, year)
        response_data = requests.get(url=api_url)
        output_json = response_data.json()
        output_json = format_response_json(output_json)
        co2_api_url = "https://api.iea.org/ghg?COUNTRY={}&TIME={}&CODE_PRODUCT=TOTAL&CODE_FLOW=CO2TES".format(
            country_name, year)
        co2_response = requests.get(url=co2_api_url)
        total_co2_data = co2_response.json()
        # print("year: ", year, " country : ", country_name, ", total_co2_data: ", total_co2_data)
        output_json["CO2TES(tCO2 per TJ)"] = None
        if total_co2_data:
            output_json["CO2TES(tCO2 per TJ)"] = total_co2_data[0].get("VALUE")
        output_json["country"] = country_name
        output_json["year"] = year
        # print("Output JSON : ", output_json)
        return output_json
    except Exception as e:
        print("Error: ", e)


def fetch_ghg_data_handler():
    try:
        # country_mapping1 = country_mapping = {
        #     "Algeria": "ag",
        #     "Botswana": "bw",
        #     "Burkina Faso": "bf"
        # }
        for countryName in country_mapping:
            print("Country : ", countryName)
            for year in range(1971, 2022):
                ghg_data = fetch_green_house_emission_data(countryName, str(year))
                all_country_year_data_list.append(ghg_data)

        insert_countries_stat_file(all_country_year_data_list)
        json_to_csv()

    except Exception as e:
        print("Error: ", e)


if __name__ == '__main__':
    start = time.time()
    fetch_ghg_data_handler()
    end = time.time()

    print(f"Runtime of the program is {end - start}")


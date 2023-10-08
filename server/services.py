from flask import request, Blueprint, render_template, redirect, flash
import africaGeoStatsHandler
from werkzeug.utils import secure_filename
import os

africaServices = Blueprint("africaServices", __name__)


@africaServices.route("/africaCountryEnergyStats", methods=["GET"])
def african_countries_energy_stats():
    # http://10.1.37.102:9823/africaCountryEnergyStats?country=Namibia&year=2014
    if request.method == 'GET':
        print("Inside GET Request")
        try:
            country = request.args.get("country")
            year = request.args.get("year")
            input_json = dict(country=country, year=year)
            print("input_json : ", input_json)
            response = africaGeoStatsHandler.energy_data_handler(input_json)
            return response
        except Exception as e:
            print("Error: ", e)
            raise Exception(str(e))


@africaServices.route("/africaCountryAllYearGHGStat", methods=["GET"])
def african_countries_all_year_ghg_emission_stats():
    # http://10.1.37.102:9823/africaCountryAllYearGHGStat?country=Namibia
    if request.method == 'GET':
        print("Inside GET Request")
        try:
            country = request.args.get("country")
            input_json = dict(country=country)
            print("input_json : ", input_json)
            response = africaGeoStatsHandler.all_year_energy_data_handler(input_json)
            return response
        except Exception as e:
            print("Error: ", e)
            raise Exception(str(e))


@africaServices.route("/africaCountryGeoStats", methods=["GET"])
def african_countries_geo_stats():
    # http://10.1.37.102:9823/africaCountryGeoStats?country=Namibia
    if request.method == 'GET':
        print("Inside GET Request")
        try:
            country = request.args.get("country")
            input_json = dict(country=country)
            print("input_json : ", input_json)
            response = africaGeoStatsHandler.country_geo_stat_data(input_json)
            return response
        except Exception as e:
            print("Error: ", e)
            raise Exception(str(e))

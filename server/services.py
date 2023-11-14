from flask import request, Blueprint, render_template, redirect, flash
import africaGeoStatsHandler, googleSearchHelper, africanCountriesPredictionModel
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


@africaServices.route("/africaCountryEnvironmentNews", methods=["GET"])
def african_countries_environment_news():
    # http://10.1.37.102:9823/africaCountryEnvironmentNews?country=Namibia
    if request.method == 'GET':
        print("Inside GET Request")
        try:
            country = request.args.get("country")
            input_json = dict(country=country)
            print("input_json : ", input_json)
            response = googleSearchHelper.african_country_wise_news_handler(input_json)
            return response
        except Exception as e:
            print("Error: ", e)
            raise Exception(str(e))


@africaServices.route("/africaCountryCO2Prediction", methods=["GET"])
def african_countries_co2_prediction_model():
    # http://10.1.37.102:9823/africaCountryCO2Prediction?country=Namibia&year=2014
    if request.method == 'GET':
        print("Inside GET Request")
        try:
            country = request.args.get("country")
            year = request.args.get("year")
            input_json = dict(country=country, year=year)
            print("input_json : ", input_json)
            response = africanCountriesPredictionModel.african_country_model_prediction_handler(input_json)
            return response
        except Exception as e:
            print("Error: ", e)
            raise Exception(str(e))


@africaServices.route("/africaCountryAdvanceCO2Prediction", methods=["GET"])
def african_countries_advance_co2_prediction_model():
    # http://10.1.37.102:9823/africaCountryAdvanceCO2Prediction?country=Namibia&year=2014&biofuel=1.046573&coal_peat=0.172106&oil=0.471214&natural_gas=0.020973
    if request.method == 'GET':
        print("Inside GET Request")
        try:
            country = request.args.get("country")
            year = request.args.get("year")
            biofuel = request.args.get("biofuel")
            coal_peat = request.args.get("coal_peat")
            oil = request.args.get("oil")
            natural_gas = request.args.get("natural_gas")

            input_json = dict(country=country, year=year, biofuel=biofuel, coal_peat=coal_peat, oil=oil,
                              natural_gas=natural_gas)
            print("input_json : ", input_json)
            response = africanCountriesPredictionModel.african_country_advance_model_prediction_handler(input_json)
            return response
        except Exception as e:
            print("Error: ", e)
            raise Exception(str(e))

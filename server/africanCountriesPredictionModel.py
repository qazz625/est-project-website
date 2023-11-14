import joblib
import warnings

warnings.filterwarnings("ignore")


def model_load_function(advance=False):
    try:
        # model_filename = ''
        # scaler_filename = ''
        # label_encoder_filename = ''
        if advance:
            model_filename = 'mlp_models/{}/mlp_model.joblib'.format("advance")
            scaler_filename = 'mlp_models/{}/scaler.joblib'.format("advance")
            label_encoder_filename = 'mlp_models/{}/label_encoder.joblib'.format("advance")

        else:
            model_filename = 'mlp_models/{}/mlp_model.joblib'.format("simple")
            scaler_filename = 'mlp_models/{}/scaler.joblib'.format("simple")
            label_encoder_filename = 'mlp_models/{}/label_encoder.joblib'.format("simple")

        loaded_model = joblib.load(model_filename)
        loaded_scaler = joblib.load(scaler_filename)
        loaded_label_encoder = joblib.load(label_encoder_filename)
        return loaded_model, loaded_scaler, loaded_label_encoder

    except Exception as e:
        print("Error : ", e)


def african_country_model_prediction_handler(input_json):
    try:
        country_name = input_json.get("country", "")
        year = input_json.get("year", "")
        loaded_model, loaded_scaler, loaded_label_encoder = model_load_function(False)
        encoded_user_country = loaded_label_encoder.transform([country_name])[0]
        user_prediction = loaded_model.predict(loaded_scaler.transform([[encoded_user_country, year]]))
        if user_prediction[0] <= 50:
            threat_level = "low"
        elif (user_prediction[0] > 50) and (user_prediction[0] <= 75):
            threat_level = "moderate"
        else:
            threat_level = "high"

        predict_value = "{:.2f}".format(user_prediction[0])
        response = dict(totalCO2Emission=predict_value, unit="tCO2 per TJ", country=country_name, year=year,
                        threat_level=threat_level)
        return response
    except Exception as e:
        print("Error : ", e)


def african_country_advance_model_prediction_handler(input_json):
    try:
        country_name = input_json.get("country", "")
        year = input_json.get("year", "")
        biofuel = input_json.get("biofuel", "")
        coal_peat = input_json.get("coal_peat", "")
        oil = input_json.get("oil", "")
        natural_gas = input_json.get("natural_gas", "")
        loaded_model, loaded_scaler, loaded_label_encoder = model_load_function(True)
        encoded_user_country = loaded_label_encoder.transform([country_name])[0]
        user_prediction = loaded_model.predict(
            loaded_scaler.transform([[encoded_user_country, year, biofuel, coal_peat, oil, natural_gas]]))
        threat_level = ""
        if user_prediction[0] <= 50:
            threat_level = "low"
        elif (user_prediction[0] > 50) and (user_prediction[0] <= 75):
            threat_level = "moderate"
        else:
            threat_level = "high"

        predict_value = "{:.2f}".format(user_prediction[0])
        response = dict(totalCO2Emission=predict_value, unit="tCO2 per TJ", country=country_name, year=year,
                        threat_level=threat_level)
        return response
    except Exception as e:
        print("Error : ", e)

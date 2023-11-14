from serpapi import GoogleSearch

params = {
    "engine": "google",
    "q": "Algeria: Environment Issues",
    "api_key": "4d47a3b0384d54ff78cac9b93a1dc71ac8a696c73c708a9892f8fbff53cc6148"
}


def filter_handler(organic_results):
    try:
        filtered_result = []
        for data in organic_results:
            news = {}
            news["title"] = data.get("title", "")
            news["link"] = data.get("link", "")
            news["favicon"] = data.get("favicon", "")
            news["source"] = data.get("source", "")
            news["description"] = data.get("snippet", "")
            filtered_result.append(news)

        return filtered_result
    except Exception as e:
        print("Error : ", e)


def african_country_wise_news_handler(input_json):
    try:
        country_name = input_json.get("country", "")
        params["q"] = country_name + ": Environment Issues"
        search = GoogleSearch(params)
        results = search.get_dict()
        organic_results = results["organic_results"]
        filtered_results = filter_handler(organic_results)
        response = dict(environmentNews=filtered_results)
        return response
    except Exception as e:
        print("Error : ", e)

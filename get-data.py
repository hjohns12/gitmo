import requests
import json
import pandas as pd

# news API documentation - https://contextualweb.io/news-api/documentation/

# KEY=
url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI"

headers = {
    'x-rapidapi-host': "contextualwebsearch-websearch-v1.p.rapidapi.com",
    'x-rapidapi-key': KEY
    }

result = []
page_n = 1
while page_n < 3:
    params = {"autoCorrect":"false",
               "pageNumber":page_n,
               "pageSize":"50",
               "q":"guantanamo bay",
               "safeSearch":"false"}
    response = requests.request("GET", url, headers=headers, params=params)
    local_res = response.json()
    page_n += 1
    result.append(local_res["value"])

with open ("output.json", "w") as f:
    f.write(json.dumps(result)) # if you want to filter down to certain fields, you can use brackets -- result["response"]["docs"] or something like that

# what are the newsrooms in the responses?
newsrooms_incl = {}

# Increment count of newsroom from each response.
for page in result:
    print("page", page)
    for item in page:
        try:
            # Increment the count if it's already been seen
            newsrooms_incl[item["provider"]["name"]] += 1
        except KeyError:
            # This newsroom has not been seen. Set their count to 1.
            newsrooms_incl[item["provider"]["name"]] = 1

# Create a sorted list of (provider, num_complete) pairs.
top_sources = sorted(newsrooms_incl.items(), 
                   key=lambda x: x[1], reverse=True)

max_complete = top_sources[0][1]


# Create a list of all users who have completed
# the maximum number of TODOs.
users = []
for user, num_complete in top_sources:
    if num_complete < max_complete:
        break
    users.append(str(user))

max_users = " and ".join(users)
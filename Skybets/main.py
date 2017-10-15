import requests
from bs4 import BeautifulSoup
import json


def GetRequest():


	f = open("the_entire_skybets_website.json", 'r')
	calcio = json.load(f)
	f.close()
	# this section of code opens up pandoras box
	length = len(calcio['data']['types']) # gets how many football games there are
	print(calcio['data']['types'][6])
	for i in range(0, 4):
		print(calcio['data']['types'][i]) # prints each football game

	json_games = [{ "country": "Italy", "data": [{"game_name" = "Italia - Serie B", "home": "Italy", "away": "Salernitana", "home_win": 2.03, "home_draw": 1.75, "home_lose": 2.5}]

			-



								"country": "Roma",
			"data": [{
					"game_name": "Italy Vs Florence",
					"home": "Italy",
					"Away": "Florence",
					"Home_win": 3.7,
					"home_draw": 2,
					"home_lose": 1.7
				},
				{
					"game_name": "France Vs Florence",
					"home": "France",
					"Away": "Florence",
					"Home_win": 0.1,
					"home_draw": 2,
					"home_lose": 0.7
				}
			]
		},
		{
			"country": "Germany",
			"data": [{
					"game_name": "Germany Vs Florence",
					"home": "Germany",
					"Away": "Florence",
					"Home_win": 3.7,
					"home_draw": 2,
					"home_lose": 1.7
				},
				{
					"game_name": "France Vs Florence",
					"home": "France",
					"Away": "Florence",
					"Home_win": 3.7,
					"home_draw": 2,
					"home_lose": 1.7
				}
			]
		}
	]


GetRequest()

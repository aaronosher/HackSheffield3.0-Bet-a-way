import json

with open('fakeData.json') as json_data:
    d = json.load(json_data)

min_list = {'number':0}
max_list = {'number':0}
for eachCountry in d:
    for x in eachCountry[0]['data']:
        for oddsData in ['home_win','home_lose','home_draw']:
            if min_list['number'] > float(x[oddsData]) or min_list['number'] == 0:
                min_list = {'number': float(x[oddsData]),
                 'country': eachCountry[0]['country'],
                 'game_name': x['game_name'],
                 'home': x['home'],
                 'Away': x['Away'],
                 'betType':oddsData
                 }
            if max_list['number'] < float(x[oddsData]) or max_list['number'] == 0:
                max_list = {'number': float(x[oddsData]),
                 'country': eachCountry[0]['country'],
                 'game_name': x['game_name'],
                 'home': x['home'],
                 'Away': x['Away'],
                 'betType':oddsData
                 }
print(min_list)
print(max_list)

def flightAndBetBudget(budget, Odds):
    bet = budget/float(Odds)
    flight = budget - bet
    return {'bet': bet, 'flight': flight}

print(flightAndBetBudget(400, max_list['number']))
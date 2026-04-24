# Procedure: WWP_AddRecentSearch

- **Module:** WWPBaseObjects
- **Description:** WWP_Add Recent Search
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| CategoryFound | Variable | Boolean |  | Category Found |
| CurrentRecentSearchResults | Variable | GX_SDT |  | Current Recent Search Results |
| Found | Variable | Boolean |  | Found |
| MaxCategories | Parameter | NUMERIC | in | Max Categories |
| MaxItemsPerCategory | Parameter | NUMERIC | in | Max Items Per Category |
| RecentAlreadyAdded | Variable | Boolean |  | Recent Already Added |
| RecentSearches | Variable | GX_SDT |  | Recent Searches |
| RecentSearchResultItem | Variable | GX_SDT |  | Recent Search Result Item |
| RecentSearchResults | Variable | GX_SDT |  | Recent Search Results |
| RecentSearchResultsJson | Variable | VARCHAR |  | Recent Search Results Json |
| Url | Parameter | VARCHAR | in | Url |
| WWP_SearchResultItem | Variable | GX_SDT |  | WWP_Search Result Item |
| WWP_SearchResults | Parameter | GX_SDT | in | WWP_Search Results |
| WWP_SearchResultsItem | Variable | GX_SDT |  | WWP_Search Results Item |
| Today | Standard Variable | DATE |  | Today |
| Time | Standard Variable | CHARACTER |  | Time |
| Pgmname | Standard Variable | CHARACTER |  | Pgmname |
| Pgmdesc | Standard Variable | CHARACTER |  | Pgmdesc |
| Page | Standard Variable | NUMERIC |  | Page |
| Line | Standard Variable | NUMERIC |  | Line |
| Output | Standard Variable | CHARACTER |  | Output |

## Business Logic

### Source (Source)

```genexus

&RecentSearchResultsJson = LoadUserKeyValue(!'WWPRecentSearch')
If &RecentSearchResultsJson.IsEmpty()
	&RecentSearches = new()
Else
	&RecentSearches.FromJson(&RecentSearchResultsJson)
EndIf

&Found = False
For &WWP_SearchResultsItem in &WWP_SearchResults
	For &WWP_SearchResultItem in &WWP_SearchResultsItem.Result
		If &WWP_SearchResultItem.Url = &Url
			&CategoryFound = False
			For &RecentSearchResults in &RecentSearches
				If &RecentSearchResults.CategoryName = &WWP_SearchResultsItem.CategoryName
					&CategoryFound = True
					&CurrentRecentSearchResults = &RecentSearchResults
					Exit
				EndIf
			EndFor
			&RecentAlreadyAdded = False
			If not &CategoryFound
				&CurrentRecentSearchResults = new()
				&CurrentRecentSearchResults.CategoryName = &WWP_SearchResultsItem.CategoryName
				&CurrentRecentSearchResults.CategoryIcon = &WWP_SearchResultsItem.CategoryIcon
				&CurrentRecentSearchResults.OrderIndex = &WWP_SearchResultsItem.OrderIndex
				&CurrentRecentSearchResults.ShowingAllResults = True
				&RecentSearches.Add(&CurrentRecentSearchResults)
				If &RecentSearches.Count > &MaxCategories
					&RecentSearches.Remove(1)
				EndIf
			Else
				For &RecentSearchResultItem in &CurrentRecentSearchResults.Result
					If &RecentSearchResultItem.Url = &Url
						&RecentAlreadyAdded = True
						Exit
					EndIf
				EndFor
			EndIf
			If not &RecentAlreadyAdded
				&CurrentRecentSearchResults.Result.Add(&WWP_SearchResultItem.Clone(), 1)
				If &CurrentRecentSearchResults.Result.Count > &MaxItemsPerCategory
					&CurrentRecentSearchResults.Result.Remove(&CurrentRecentSearchResults.Result.Count)
				EndIf
				SaveUserKeyValue(!'WWPRecentSearch', &RecentSearches.ToJson())
			EndIf
			&Found = true
			Exit
		EndIf
	EndFor
	If &Found
		Exit
	EndIf
EndFor
```

### Rules (Rules)

```genexus

parm(in:&WWP_SearchResults, in:&Url, in:&MaxCategories, in:&MaxItemsPerCategory);
```


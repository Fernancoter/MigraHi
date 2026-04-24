# SDT: TrackingParameters

- **Module:** GeneXus.Common
- **Description:** Tracking Parameters
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| ChangesInterval | SDTItem | Dynamic |  | Minimum time in seconds to generate new tracking information |
| Distance | SDTItem | Dynamic |  | Minimum distance in meters to generate new tracking information |
| Action | SDTItem | Dynamic |  | The name of the action from the parent object to be called where there is new tracking information available |
| ActionTimeInterval | SDTItem | Dynamic |  | The minimum interval in seconds between invocations to the action. Must be greater than changesInterval. |
| Accuracy | SDTItem | Dynamic |  | Precision to obtain the locations, in meters |
| UseForegroundService | SDTItem | Dynamic |  | Enables/disables the usage of Foreground service for tracking location. |

## Business Logic

### SDT Structure (Structure)

```genexus
// SDT Extraction
(Raw representation avoided to prevent serialization errors. Core variables added to DataDictionary.)
```


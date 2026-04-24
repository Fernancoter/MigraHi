# SDT: BeaconState

- **Module:** GeneXus.SD
- **Description:** Beacon State
- **GAM Object:** No

## Data Dictionary / Parameters

| Name | Element Type | Data Type | Accessor | Description |
|---|---|---|---|---|
| Beacon | SDTItem | Dynamic |  | A single beacon. |
| Proximity | SDTItem | Dynamic |  | Proximity of the beacon from the device. The value in this property gives a general sense of the relative distance to the beacon. |
| Distance | SDTItem | Dynamic |  | The estimated proximity value, measured in meters from the beacon. This value is heavily subject to variations in an RF environment. A negative accuracy value indicates the proximity is unknown. |
| Signal | SDTItem | Dynamic |  | Received signal strength in decibels of the specified beacon. This value is an average of the RSSI samples collected since this beacon was last reported. |

## Business Logic

### SDT Structure (Structure)

```genexus
// SDT Extraction
(Raw representation avoided to prevent serialization errors. Core variables added to DataDictionary.)
```


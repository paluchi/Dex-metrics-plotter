# Project full logics documetation

#### Use this file to read usage instructions and document the new logics added to the system

---

## Components

### ChartFacade

```sh
./src/components/statistics/charting/facade
```

#### Receiving parametrs

- header (optional) {string}
- - Feader of the chart
- description (optional) {string}
- - Description of the chart
- modifiers (optional) {array}
- - Modifiers of the chart. This options reload the chart having in count the option parameter when pressed

```json
[
  {
    "id": "your id",
    "header": "tour header",
    "items": [
      {
        "_comment": "content (obligatory) {string} is the displayed text, value (obligatory) {any} the value it represents and active (optional) {boolean} if is the current selected option",
        "content": "option1",
        "value": 1,
        "active": true
      },
      {
        "content": "4h",
        "value": "some string"
      }
    ]
  },
  ...
]
```

- id (obligatory) {string}
- - Id of the chart
- updateInterval (optional) {number}
- - This property descrives the amount of time an interval would wait to reload the chart
- contentLoader (optional) {function}
- - This function receives and object containing the modifiers names and expect one of the declared posible values of each. Then request, parse and return data to reload the chart
- content (add this or metricsLoader prop) {array}
- - This is used for static graphs and receives an array of multiple objects
- - both content and contentLoader must return the next convention when used

```json
  {
    "_comment": "type (obligatory) {string}, data (obligatory) {array of objecst}, content (optional) {object of multiple objects}. Content must has a key value pair for every plotting element where the key is the plotting element key and the value an object of it´s properties",
    "type": "line",
    "data": [{name: "july 1": metric_1: 5, metric_2: 8},{name: "july 2": metric_1: 12, metric_2: 4}, ...],
    "contentProps": {metric_1:{
                    "_comment": "None of this variables are obligatory. consult rechart line graph properties to get more information",
                    type: "monotone",
                    strokeColor: "#5E71F0",
                    strokeWidth: 1.5,
                    dot: {
                      fillColor: undefined,
                      strokeColor: undefined,
                      strokeWidth: 1.5,
                      radius: 2.5,
                    },
                    activeDot: {
                      fillColor: undefined,
                      strokeColor: undefined,
                      strokeWidth: 5,
                      radius: 5,
                    },
                    metric_2:{...}},
};
  }
```

- display (optional) {object}
- - The display settings of the chart

```json
{
  "_comment": "height and width (optional) {string, number or undefined} represents the height and width of the chart in px, %, etc. aspect (optional) {number} displays the chart on a ratio. At least one of the must be declared but not aspect if one of the other are declared",
  "height": 350,
  "width": undefined,
  "aspect": undefined
}
```
- hideLegend (optional) {boolean}
- - Set to true to hide the charting components legends
- hide toolTip (optional) {boolean}
- - Set to true to hide the charting components tooltip

###### Follow the next path to get an example

```ssh
.\src\graphs\aprMA\AprMA.tsx
```

---

# ADD MORE DOCUMENTATION

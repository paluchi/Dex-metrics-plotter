# Project full logics documetation

#### Use this file to read usage instructions and document the new logics added to the system

---

## Components

### ChartFacade

```sh
./src/components/statistics/charting/facade
```

#### Receiving parametrs

- header (obligatory) {string}
- - Feader of the chart
- description (obligatory) {string}
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
  }
]
```

- id (obligatory) {string}
- - Id of the chart
- updateInterval (optional) {number}
- - This property descrives the amount of time an interval would wait to reload the chart
- data (add this or metricsLoader prop) {array}
- - This is used for static graphs and receives an array of multiple objects

```json
[
  {
    "_comment": "name (obligatory) {string} is of the plotting line, somekey and somekey2  (at leat 1) {number} represents the y axis name and the y axis value respectively",
    "name": "your id",
    "someKey": 10,
    "someKey2": 15
  }
]
```

- display (obligatory) {object}
- - The display settings of the chart

```json
{
  "_comment": "height and width (optional) {string, number or undefined} represents the height and width of the chart in px, %, etc. aspect (optional) {number} displays the chart on a ratio. At least one of the must be declared but not aspect if one of the other are declared",
  "height": 350,
  "width": undefined,
  "aspect": undefined
}
```

- metricsLoader
- - This function receives and object containing the modifiers names and expect one of the declared posible values of each. Then request, parse and return data to reload the chart

###### Follow the next path to get an example

```ssh
.\src\graphs\aprMA\AprMA.tsx
```

---

# ADD MORE DOCUMENTATION

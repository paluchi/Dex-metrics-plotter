# Project full logics documetation

#### Use this file to read usage instructions and document the new logics added to the system

---

# Project full components documetation

#### Use this file to read usage instructions and document the new components added to the system

---

## Routes

### metricsbydaterange

```sh
.\src\router\router.ts
```

#### Receiving parametrs.

- query
- - fromDate (obligatory) {date}
- - - Date the metrics are going to be requested from
- - toDate (obligatory) {date}
- - - Date the metrics are going to be requested to
- headers
- - api_key (obligatory) {string}
- - - Client api key. Used for authentication

###### Follow the next path to get an postman example file 
```ssh
.\service_provider.postman.json
```

---

# ADD MORE DOCUMENTATION
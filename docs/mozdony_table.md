# engine table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
gyártási év     | date          | **production date** - engine's production date
típus           | int           | **type** - engine's type
húzóerő         | float         | **pulling power** - engine's pulling power
sebesség        | int           | **max speed** - engine's max speed

### típus
Value | Meaning
------ | ----- 
1      | gas
2      | diesel
3      | electric
# route table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
menetrend       | int           | **schedule ID** - foreign key to the [*menetrend*_table](https://github.com/vluv99/train_database/blob/master/docs/menetrend_table.md)
idő             | date          | **date** - the route's exact date
szerelvény      | int           | **train's ID** - foreign key to the [*szerelvény*_table](https://github.com/vluv99/train_database/blob/master/docs/szerelveny_table.md)

This table connects the schedules and cars together, so we would know which cars are on which routes.
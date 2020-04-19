# train cars table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
szerelvény      | int           | **train ID** - foreign key to the [*szerelveny*_table](https://github.com/vluv99/train_database/blob/master/docs/szerelveny_table.md)
kocsi           | int           | **car ID** - foreign key to the [*kocsi*_table](https://github.com/vluv99/train_database/blob/master/docs/kocsi_table.md)

This table tells us which cars are on a which trains. It connects those tables together.
# ticket table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
felhasználó     | string        | **username** - foreign key to the [*felhasználó*_table](https://github.com/vluv99/train_database/blob/master/docs/felhaszn%C3%A1l%C3%B3_table.md)
út              | int           | **route ID** - foreign key to the [*utak*_table](https://github.com/vluv99/train_database/blob/master/docs/utak_table.md)
kocsi           | int           | **car ID** - foreign key to the [*kocsi*_table](https://github.com/vluv99/train_database/blob/master/docs/kocsi_table.md)
szék            | int           | **seat ID** - foreign key to the [*szék*_table](https://github.com/vluv99/train_database/blob/master/docs/szek_table.md)
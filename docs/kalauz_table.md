# conductor table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
dolgozo         | int           | **worker ID** - foreign key to the [*dolgozo*_table](https://github.com/vluv99/train_database/blob/master/docs/dolgozo_table.md)
út              | int           | **route ID** - foreign key to the [*utak*_table](https://github.com/vluv99/train_database/blob/master/docs/utak_table.md)
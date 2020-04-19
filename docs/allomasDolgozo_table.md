# station worker table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
dolgozo         | int           | **worker ID** - foreign key to the [*dolgozo*_table](https://github.com/vluv99/train_database/blob/master/docs/dolgozo_table.md)
állomás         | int           | **station ID** - foreign key to the [*allomas*_table](https://github.com/vluv99/train_database/blob/master/docs/allomas_table.md)

This table contains which worker works on which stations. It's purpose to connect those tables.

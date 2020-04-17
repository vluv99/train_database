# station worker table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
dolgozo         | int           | **worker ID** - foreign key to the [*dolgozo*_table]()
állomás         | int           | **station ID** - foreign key to the [*allomas*_table]()

This table contains which worker works on which stations. It's purpose to connect those tables.

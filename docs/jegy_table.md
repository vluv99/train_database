# ticket table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
felhasználó     | string        | **username** - foreign key to the [*felhasználó*_table]()
út              | int           | **route ID** - foreign key to the [*utak*_table]()
kocsi           | int           | **car ID** - foreign key to the [*kocsi*_table]()
szék            | int           | **seat ID** - foreign key to the [*szék*_table]()
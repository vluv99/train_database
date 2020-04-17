# train cars table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
szerelvény      | int           | **train ID** - foreign key to the [*szerelveny*_table]()
kocsi           | int           | **car ID** - foreign key to the [*kocsi*_table]()

This table tells us which cars are on a which trains. It connects those tables together.
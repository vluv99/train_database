# train table

Column name     | Type          | Description
------------    | ------------- | -------------
id              | int           | **identifier**
mozdony         | int           | **engine ID** - foreign key to the [*mozdony*_table](https://github.com/vluv99/train_database/blob/master/docs/mozdony_table.md)


This table tells us which trains are on a which routes. It connects those tables together.
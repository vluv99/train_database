# leave table

Column name       | Type          | Description
------------      | ------------- | -------------
id                | int           | **identifier**
dolgozo           | int           | **worker ID** - foreign key to the [*dolgozo*_table](https://github.com/vluv99/train_database/blob/master/docs/dolgozo_table.md)
szabadság kezdete | date          | **leave's start** - the leave's starting date
szabadság vége    | date          | **leave's start** - the leave's ending date
jóváhagyott       | int (boolean) | **approval** - is the leave approved yet?

<br>
__________________________________

### boolean values
1      | 0          
:---:  | :---:
true   | false 


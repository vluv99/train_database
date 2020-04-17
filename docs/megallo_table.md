# stop table

Column name     | Type               | Description
------------    | -------------      | -------------
id              | int                | **identifier** - auto increment
állomás         | int                | **station** - the ID of the station
járat           | int                | **route** - the Id of the route *(utak_table)*
idő             | (time/string) date | **arrival time** - *(eg.: 00:00; 02:32)*

This table describes the stops a train takes on a schedule.

The trains arrival time shows if the train is starting at that station or it is just a stop. 
 - 00:00 - means it is the starting station, it haven't been on the road for any minutes yet. 
 - 02:32 - means it's been on the road for 2 hours 32 minutes when it arrives to that station, so its a stop.

 This table works with [*menetrend*_table](), to complete the train's scedule.
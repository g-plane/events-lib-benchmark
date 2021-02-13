Benchmark result (in `ms`). Lower is better.

|Library|Stage1 min|Stage1 max|Stage1 avg|Stage2 min|Stage2 max|Stage2 avg|Total min|Total max|Total avg|
|--|--|--|--|--|--|--|--|--|--|
<%_ for (const result of results) { _%>
|<% for (const item of result) { %><%= item %>|<% } %>
<% } _%>

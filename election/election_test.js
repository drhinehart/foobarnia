var test = require('tape');
var election = require('./election')

test('majority win', function (t) {
  t.plan(1);
  var votes = [2,2,5,5,5,7,5,5,1,5,2];
  var results = election.tally(votes);
  t.same(results, [5]);
});

test('election runoff', function(t) {
  t.plan(1);
  var votes = [7,8,3,3,3,8,2,4,4,4,2,2,4,2,3,4,5,3,4,4];
  var results = election.tally(votes);
  results.sort( function(a,b) { a - b } );
  t.same(results, [2,3,4]);
});

test('election runoff with tie', function(t) {
  t.plan(1);
  var votes = [8,9,1,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,7,7,8];
  var results = election.tally(votes)
  results.sort( function(a,b) { a - b } );
  t.same(results, [1,2,3,4,5]);
});

test('initial counts array', function(t) {
  t.plan(1);
  var votes = [2,2,5,5,5,7,5,5,1,5,2];
  var results = election.buildInitialCountsArray(votes);
  t.same(results, [0,0,0,0,0,0,0,0]);
});

test('build counts array', function(t) {
  t.plan(1);
  var votes = [2,2,5,5,5,7,5,5,1,5,2];
  var counts = election.buildInitialCountsArray(votes);
  var results = election.buildCounts(votes, counts);
  t.same(results, [0,1,3,0,0,6,0,1]);
});

test('get runoff array', function(t) {
  t.plan(1);
  var votes = [5,5,5,2,2,1,1,3,3,6,9,4];
  var counts = election.buildInitialCountsArray(votes);
  counts = election.buildCounts(votes, counts);
  var results = election.findRunoffCandidates(counts);
  results.sort( function(a,b) { a - b } );
  t.same(results, [1,2,3,5]);
});
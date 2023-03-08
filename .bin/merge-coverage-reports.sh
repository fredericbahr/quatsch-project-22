#!/bin/bash
COUNTER=0

# Find all coverage directories in apps or packages
COVERAGE_PATHS=$(find apps/ packages/ -name coverage -type d -print 2>/dev/null)

# Create a coverage directory in root
mkdir -p .nyc_output

# Copy all coverage reports to root
for COVERAGE_PATH in $COVERAGE_PATHS; do
    cp $COVERAGE_PATH/coverage-final.json .nyc_output/$COUNTER-coverage.json
    let COUNTER++
done

# Merge all coverage reports
npx nyc report --reporter=clover --reporter=json --reporter=lcov --reporter=text-summary

# Remove all coverage reports
rm -rf .nyc_output
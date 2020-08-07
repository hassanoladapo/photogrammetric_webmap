import geojson
import io
import sys
import cgi
# cgitb module for debugging:
import cgitb
cgitb.enable()
 
# Create instance of FieldStorage
form = cgi.FieldStorage()
# Get data from fields
x = float(form.getvalue('x'))
y = float(form.getvalue('y'))
 
# create a point in geojson format and dump to a string
gjObject = geojson.Point([x, y])
gjStr = geojson.dumps(gjObject)
 
#encode the string to bytes with the standard utf-8 encoding
gjStr = gjStr.encode('utf-8')
 
#create an in-memory bytes buffer and write the geojson
f = io.BytesIO()
f.write(gjStr)
 
#return geojson to the client (this uses bytes objects not string objects!)
sys.stdout.buffer.write( b"Content-Type: application/json\n\n")
sys.stdout.buffer.write(f.getvalue())
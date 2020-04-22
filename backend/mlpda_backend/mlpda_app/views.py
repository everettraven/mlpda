from django.shortcuts import render
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from mlpda_app.serializers import PredictionSerializer
from PIL import Image
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes

from mlpda_app.predict import predict

#Custom image upload parser for files
class ImageUploadParser(FileUploadParser):
    media_type = 'image/*'

#Our API upload handler
class MyUploadView(APIView):
   # permission_classes = [IsAuthenticated]
    parser_classes = (ImageUploadParser, MultiPartParser, FormParser)

    #ensure that when posting the user is authenticated
    @permission_classes([IsAuthenticated])
    def post(self, request):
        #Check for the file field in the request
        if 'file' not in request.data:
            raise ParseError("Empty content")

        #Read the image file
        image_file = request.data['file'].read()
        
        #Get our prediction and return the result
        mydata = [{"prediction": predict(image_file),},]
        return Response(mydata, headers={'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Authorization, Origin, X-Requested-With, Content-Type, Accept'})

    #This is open for all as most browsers will send an options request before the actual request
    def options(self, request, *args, **kwargs):
        return Response(headers={'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Authorization, Origin, X-Requested-With, Content-Type, Accept'})

# This is the custom auth view we created for when authenticating users for our API
class CustomAuthView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        #Extract the data from teh request
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)

        #Get the user data
        user = serializer.validated_data['user']

        #Create a token based on the user data
        token, created = Token.objects.get_or_create(user=user)

        #Return the auth token
        return Response({
            'token': token.key
        },  headers={'Access-Control-Allow-Origin':'*'})

    def options(self, request, *args, **kwargs):
        return Response(headers={'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'})
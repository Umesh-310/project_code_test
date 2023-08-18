from django.shortcuts import HttpResponse

class MyMiddleware:
    def __init__(self,get_response):
        self.get_response = get_response
        print('One Time init')

    def __call__(self,request):
        print('before view')
        
        response = self.get_response(request)
        print('after view')
        return response
    
    def process_view(self,request,*args,**kwargs):
        if request.method == 'POST':
            return HttpResponse('Before view preocees View ')
        else:
            return None
    
    def process_exception(self,request,exception):
        class_name = exception.__class__.__name__
        print(class_name)
        print(exception)
        return HttpResponse(str(exception)+' Exception Raise')
    
    def process_template_response(self,request,response):
        print('request',request)
        print('response',response)
        # response.context_data['name'] = 'XYZ'
        return response
    
# -> views.py
# class TempView(APIView):
#     def get(self,request,format=None):
#         print(request.data)
#         # a = 10/0  # DivisionByZero
#         # if(not request.data):
#         #     raise Exception('hii not found')
#         # return Response({'msg':'hii from TempView'},status=status.HTTP_200_OK)
#         context = {'name':'ABC'}
#         return TemplateResponse(request, 'author/temp.html',context)
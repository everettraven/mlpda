from Prediction.prediction import *

#Make a prediction with the Prediction module
def predict(encoded_string):
    pred = predict_from_encoded_string(encoded_string, "/MLPDA/src/MachineLearning/pneumonia_model_v2.h5")
    return pred

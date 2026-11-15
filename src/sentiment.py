from transformers import pipeline
sentiment_pipeline = pipeline("sentiment-analysis","distilbert/distilbert-base-uncased-finetuned-sst-2-english")
data = ["I like you"]
print(sentiment_pipeline(data))
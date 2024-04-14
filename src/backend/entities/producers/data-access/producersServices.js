import "@/backend/db/connectDB";
import { Producer } from "./producers.schema";

export const producerServices = Object.freeze({
  getProducers,
  getProducerByField,
  createProducer,
  updateProducer,
  getProducerById,
});

async function getProducers() {
  const producers = await Producer.find();
  return producers;
}

async function getProducerByField(objQuery) {
  let producer = await Producer.findOne(objQuery);
  producer = producer ? producer.toObject() : producer;
  return producer;
}

async function getProducerById(id) {
  let producer = await Producer.findById(id);
  producer = producer ? producer.toObject() : producer;
  return producer;
}

async function createProducer(userObj) {
  const producer = await Producer.create(userObj);
  return producer.toObject();
}

async function updateProducer(filter, updateObj) {
  const updatedProducer = await Producer.findOneAndUpdate(filter, updateObj, {
    new: true,
  });
  return updatedProducer.toObject();
}

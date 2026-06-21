import type Product from "../models/product";
import axios, { type AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:8080/api";
async function getProducts(
  signal: AbortSignal,
): Promise<AxiosResponse<Product[]>> {
  const data = await axios.get(`${baseUrl}/products/all`, { signal });
  return data; // returns a [Product1, Product2, ...]
}

async function getProductById(
  id: number,
  signal: AbortSignal,
): Promise<AxiosResponse<Product>> {
  return await axios.get(`${baseUrl}/product/${id}`, { signal });
}

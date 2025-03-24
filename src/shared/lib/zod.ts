import {
  type SafeParseReturnType,
  type ZodSchema,
  type ZodTypeDef,
  type ZodTypeAny,
  type UnknownKeysParam,
  type ZodNullable,
  type ZodRawShape,
  z,
} from "zod";
import type { ZodObject } from "zod";

export const safeParseAsync = async <TOutput, TInput>(
  schema: ZodSchema<TOutput, ZodTypeDef, TInput> | undefined,
  data: unknown,
): Promise<SafeParseReturnType<TInput, TOutput>> => {
  if (process.env.NODE_ENV === "development" && schema) {
    return await schema.safeParseAsync(data);
  }

  return { success: true, data: data as TOutput };
};

export const safeParse = <TOutput, TInput>(
  schema: ZodSchema<TOutput, ZodTypeDef, TInput> | undefined,
  data: unknown,
): SafeParseReturnType<TInput, TOutput> => {
  if (process.env.NODE_ENV === "development" && schema) {
    return schema.safeParse(data);
  }

  return { success: true, data: data as TOutput };
};

export type NullableObjectReturn<T extends ZodRawShape> = ZodObject<
  { [k in keyof T]: ZodNullable<T[k]> },
  UnknownKeysParam,
  ZodTypeAny
>;

export function nullableObject<T extends ZodRawShape>(
  obj: ZodObject<T>,
): NullableObjectReturn<T> {

  const newShape: any = {}

  Object.keys(obj.shape).forEach((key) => {
    const fieldSchema = obj.shape[key]
    newShape[key] = fieldSchema.nullish()
  })

  return new z.ZodObject({
    ...(obj.shape._def as any),
    shape: () => newShape,
  }) as any
}


export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .max(64, "Password must be at most 64 characters long")


export const mobilePhoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile phone number format");

export const CUSTOM_ERRORS_FIELD = {
  REQUIRED: "This field is required",
}
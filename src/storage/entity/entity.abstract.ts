import { ZodObject, ZodRawShape, z } from 'zod';

type ShapeTypeDescription = {
  name: string;
  type: 'uuid';
  primary?: boolean;
  index?: boolean;
};
type EntityShapeDescription = string | ShapeTypeDescription;
type ShapeTypeDescriptions<T extends ZodObject<ZodRawShape>> = Partial<
  Record<keyof z.TypeOf<T>, EntityShapeDescription>
>;

export abstract class Entity<T extends ZodObject<ZodRawShape>> {
  protected abstract readonly schema: T;
  protected abstract columns: Map<keyof z.TypeOf<T>, EntityShapeDescription>;

  private shapeTypeDescriptions?: ShapeTypeDescriptions<T>;

  protected describeField(key: keyof z.TypeOf<T>, value: EntityShapeDescription) {
    if (!this.shapeTypeDescriptions) this.shapeTypeDescriptions = {};
    this.shapeTypeDescriptions[key] = value;

    return this;
  }
}

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

  // constructor() {
  //   this.init();
  // }
  protected describeField(key: keyof z.TypeOf<T>, value: EntityShapeDescription) {
    if (!this.shapeTypeDescriptions) this.shapeTypeDescriptions = {};
    this.shapeTypeDescriptions[key] = value;

    return this;
  }
  // private init() {
  //   let key: keyof ShapeTypeDescriptions<T>;
  //   if (this.shapeTypeDescriptions)
  //     for (key in this.shapeTypeDescriptions) {
  //       if (Object.prototype.hasOwnProperty.call(this.shapeTypeDescriptions, key)) {
  //         const val = this.shapeTypeDescriptions[key];
  //         if (val) {
  //           if (typeof val === 'string') this.columns.set(key, val);
  //           else this.columns.set(key, val.name);
  //         }
  //       }
  //     }
  // }
}

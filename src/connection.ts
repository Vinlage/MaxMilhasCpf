import mongoose from "mongoose";
import { Express } from "express";

const connect = (app: Express) => {
    const PORT: string | number = process.env.PORT || 3333;
    const uri: string = process.env.URI || `mongodb://localhost:27017/database`;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.set("useFindAndModify", false);

    if(process.env.NODE_ENV === 'test'){
        const Mockgoose = require('mockgoose').Mockgoose;
        const mockgoose = new Mockgoose(mongoose);
      
        mockgoose.prepareStorage()
          .then(() => {
            mongoose
              .connect(uri, options)
              .then(() =>
                app.listen(PORT, () =>
                  console.log(`Server running on http://localhost:${PORT}`)
                )
              )
              .catch(error => {
                throw error;
              });
          });
      
      } else {
        mongoose
          .connect(uri, options)
          .then(() =>
            app.listen(PORT, () =>
              console.log(`Server running on http://localhost:${PORT}`)
            )
          )
          .catch(error => {
            throw error;
          });
      }
}

export { connect };
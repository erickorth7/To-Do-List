//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-eric:Test123@cluster0-jfwxx.mongodb.net/test?retryWrites=true/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to your to-do-list!"
});

const item2 = new Item ({
  name: "Hit the plus button to add an item."
});

const item3 = new Item ({
  name: "<--- Hit this to get rid of items."
});

const defaultItems = [item1, item2, item3];


const listSchema = {

  name: String,
  items: itemsSchema

};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  let day = date.getDate();

  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {

      Item.insertMany(defaultItems, function(err) {

        if (err) {

          console.log(err);
        } else {

          console.log("Successfully Added to database!");
        }

      });
    res.redirect("/");
    } else {

    res.render("list", {listTitle: day, newListItems: foundItems});
}
  });

});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

item.save();

res.redirect("/");

});

app.post("/delete", function(req, res) {

  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err){

    if(err) {

      console.log(err);

    } else {

      console.log("Item Successfully Deleted!");
      res.redirect("/");
    }

  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

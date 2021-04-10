import Vue from "vue";
import moment from "moment";

Vue.filter("dateFormat", (value, format) => {
  if (value) {
    return moment(value).format(format || "YYYY-MM-DD");
  }
  return value;
});

export default {};

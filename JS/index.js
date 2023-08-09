const calculate = {
    calculateAge: function(){
        var isValidDate = true;
        const currentDate = new Date()
        event.preventDefault();

        document.getElementsByClassName("day_label")[0].innerHTML = "";
        document.getElementsByClassName("month_label")[0].innerHTML = "";
        document.getElementsByClassName("year_label")[0].innerHTML = "";
        document.getElementById("day").classList.remove("error_border");
        document.getElementById("month").classList.remove("error_border");
        document.getElementById("year").classList.remove("error_border");
        document.getElementsByClassName("input_form_div")[0].classList.remove("error");
        document.getElementsByClassName("input_form_div")[1].classList.remove("error");
        document.getElementsByClassName("input_form_div")[2].classList.remove("error");

        if(day.value == ""){
            document.getElementsByClassName("day_label")[0].innerHTML = "This field is required";
            document.getElementById("day").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[0].classList.add("error");
            isValidDate = false;
        }else if(day.value > 31 || day.value < 1){
            document.getElementsByClassName("day_label")[0].innerHTML = "Must be a valid day";
            document.getElementById("day").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[0].classList.add("error");
            isValidDate = false;
        }

        if(month.value == ""){
            document.getElementsByClassName("month_label")[0].innerHTML = "This field is required";
            document.getElementById("month").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[1].classList.add("error");
            isValidDate = false;
        }else if(month.value > 12 || month.value < 1){
            document.getElementsByClassName("month_label")[0].innerHTML = "Must be a valid month";
            document.getElementById("month").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[1].classList.add("error");
            isValidDate = false;
        }

        if(year.value == ""){
            document.getElementsByClassName("year_label")[0].innerHTML = "This field is required";
            document.getElementById("year").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[2].classList.add("error");
            isValidDate = false;
        }else if(year.value > currentDate.getFullYear()){
            document.getElementsByClassName("year_label")[0].innerHTML = "Must be in the past";
            document.getElementById("year").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[2].classList.add("error");
            isValidDate = false;
        }else if(new Date(month.value+"/"+day.value+"/"+year.value) > currentDate){
            document.getElementsByClassName("year_label")[0].innerHTML = "Must be in the past";
            document.getElementById("day").classList.add("error_border");
            document.getElementById("month").classList.add("error_border");
            document.getElementById("year").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[0].classList.add("error");
            document.getElementsByClassName("input_form_div")[1].classList.add("error");
            document.getElementsByClassName("input_form_div")[2].classList.add("error");
        }
        
        if(!this.checkValidDate(day.value, month.value, year.value)){
            document.getElementsByClassName("day_label")[0].innerHTML = "Must be a valid date";
            document.getElementById("day").classList.add("error_border");
            document.getElementById("month").classList.add("error_border");
            document.getElementById("year").classList.add("error_border");
            document.getElementsByClassName("input_form_div")[0].classList.add("error");
            document.getElementsByClassName("input_form_div")[1].classList.add("error");
            document.getElementsByClassName("input_form_div")[2].classList.add("error");
            isValidDate = false;
        }

        if(isValidDate){
            const birthdate = new Date(month.value+"/"+day.value+"/"+year.value);
            var age = currentDate - birthdate;
            age = parseInt((age/1000)/86400)

            let years = 0;
            years = parseInt(age/365);
            age = age % 365;

            console.log(age);
            console.log(currentDate);
            var months = 0;
            var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var lessThanMonth = false;

            while(!lessThanMonth){
                if(age >= daysInMonth[months]){
                    age -= daysInMonth[months];
                    months++;
                }else{
                    lessThanMonth = true;
                }
            }
            
            this.animateAge(document.getElementById("result_day"), age)
            this.animateAge(document.getElementById("result_month"), months)
            this.animateAge(document.getElementById("result_year"), years)
        }
    },

    checkValidDate: function(day, month, year){
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            daysInMonth[1] = 29;
        }
        if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
            return false;
        }
        return true;
    },

    animateAge: function(object, end){
        object.innerHTML = 0;
        var done = false;
        var currentValue = object.innerHTML;

        const step = () => {
            if(currentValue != end){
                currentValue++;
            }else{
                done = true;
            }
            object.innerHTML = currentValue;
            if(!done){
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
}

window.calculate = calculate;
export {calculate};
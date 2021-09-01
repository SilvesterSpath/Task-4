/* 
* Gets the processing page 
* @param {array} data  
*/

function getProcessingPage(data){
	const result = [];
	getProcessHelper(data, result)
	return result;
}

function getProcessHelper(data, result) {
	let i = 0;	
	while ( i < data.length) {
		if (data[i].state === 'processing') {
			setTimeout(() => getProcessHelper(data.slice(i), result), 2000);
			i++;
			return		
		}
		else if (data[i].state === 'success'){
			log(messages.success)
			result.push(messages.success)			
			i++										
		}
		else {
			errorHandler(data[i].errorCode, result)
			i++
		}
	}	
}

function errorHandler(errorCode, result) {
	if (errorCode === 'NO_STOCK'){				
		log(messages.error_1);
		result.push(messages.error_1)								
	}
	else if (errorCode === 'INCORRECT_DETAILS') {
		log(messages.error_2);
		result.push(messages.error_2)		
	}
	else {				
		log(messages.error_3);		
		result.push(messages.error_3)																
	}		
}

function log(message){
	console.log(message);
}

const messages = {
	success: {title : 'Order Complete', message: null},
	error_1: {title: 'Error page', message: 'No stock has been found'},
	error_2: {title: 'Error page', message: 'Incorrect details have been entered'},
	error_3: {title: 'Error page', message: null}
}



// Test Area

const test = getProcessingPage([{state: 'success'}, {state: 'processing'}])
const myresult = [{title : 'Order Complete', message: null}]

if (test.length > 0){
		if (myresult[0].title === test[0].title && myresult[0].message === test[0].message){
		console.log('ok');
	} else{
		console.log('not ok');
	}
}

getProcessingPage([{state: 'processing'}, {state: 'error'}])
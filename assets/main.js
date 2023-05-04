hostname = window.location.hostname;
user = "guest"
directory = "~"
document.title = hostname;
document.getElementById("user").innerHTML = lmao();

document.getElementById("tui").addEventListener("focusout", () => {
    document.getElementById("tui").focus();
});

document.getElementById("tui").addEventListener('input', () => {
    document.getElementById("tui").style.width = document.getElementById("tui").value.length+1 + "ch";
});

document.addEventListener("keydown", tuiHandler);

function tuiHandler(e){
    if(e.key == "Enter"){
        var command = document.getElementById("tui").value;
        var log = createEcho(lmao() + command);
        document.getElementById("terminal").appendChild(log);
        document.getElementById("tui").value = "";
        var mainCommand = command.toLowerCase().split(' ')[0];
        switch(mainCommand){
            case "":
                break;
            case "help":
                var log = '<a onclick="runCommand(this.innerHTML)">help</a> <a onclick="runCommand(this.innerHTML)">clear</a> <a onclick="runCommand(this.innerHTML)">ping</a> <a onclick="runCommand(this.innerHTML)">whoami</a> <a onclick="runCommandNOE(this.innerHTML)">su</a>[NAME]';
                document.getElementById("terminal").appendChild(createUnsafeEcho(log));
                break;
            case "clear":
                document.getElementById("terminal").innerHTML = "";
                break;
            case "ping":
                document.getElementById("terminal").appendChild(createEcho("pong!"));
                break;
            case "whoami":
                document.getElementById("terminal").appendChild(createEcho('\nantun@' + hostname + "\n----------------------------\nHello! My name is Antun\n\n"));
                break;
            case "su":
                user = command.toLowerCase().split(' ')[1];
                break;
            default:
                document.getElementById("terminal").appendChild(createEcho(mainCommand + ": command not found"));
                break;
        }
        document.getElementById("user").innerHTML = lmao();
    }
}

function createUnsafeEcho(text){
    var log = document.createElement("div");
    log.innerHTML = text;
    return log;
}

function createEcho(text){
    var log = document.createElement("div");
    log.innerText = text;
    return log;
}

function runCommand(command){
    document.getElementById("tui").style.width = command.length + "ch";
    document.getElementById("tui").value = command;
    document.dispatchEvent(new KeyboardEvent("keydown", {'key': "Enter"}));
}

function runCommandNOE(command){
    document.getElementById("tui").style.width = (command.length+3) + "ch";
    document.getElementById("tui").value = command + " ";
}

function lmao(){
    return user +'@' + hostname + ":" + directory + "$\u00a0";
}

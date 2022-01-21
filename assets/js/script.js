var record = 0;

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
}

function start() {

	$("#menuInicial").hide();
	$("#fundoDoJogo").append("<div id='placar'></div>");
	$("#fundoDoJogo").append("<div id='jogador'</div>");
	$("#fundoDoJogo").append("<div id='inimigo1'</div>");
	$("#fundoDoJogo").append("<div id='inimigo2'></div>");
	$("#fundoDoJogo").append("<div id='inimigo3'></div>");

    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somResgate = document.getElementById("somResgate");

	var jogador = $("#jogador");
	var inimigo1 = $("#inimigo1");
	var inimigo2 = $("#inimigo2");
	var inimigo3 = $("#inimigo3");

    var velInimigo1 = parseInt(Math.random() * (10-2) + 2);
	var velInimigo2 = parseInt(Math.random() * (10-2) + 2);
	var velInimigo3 = parseInt(Math.random() * (10-2) + 2);
	
	var podeAtirar = true;
    var pontos = 0;
    var energiaAtual = 3;

	const TECLA = {
		W : 87,
		D : 68,
		S : 83,
	};

	var jogo = {};
	jogo.pressionou = [];

    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
    
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });

    function moveFundo() {
        let esquerda = parseInt($("#fundoDoJogo").css("background-position"));
        $("#fundoDoJogo").css("background-position",esquerda-1);
    }

    function moveJogador() {

        if (jogo.pressionou[TECLA.W]) {
            let topo = parseInt(jogador.css("top"));
            jogador.css("top",topo-10);
            if (topo<=0) {
                jogador.css("top",topo+10);
            }
        }
        
        if (jogo.pressionou[TECLA.S]) {
            let topo = parseInt(jogador.css("top"));
            jogador.css("top",topo+10);
            if (topo>=660) {	
                jogador.css("top",topo-10);
            }	
        }
        
        if (jogo.pressionou[TECLA.D]) {
            disparo();
        }
    }

    function moveInimigo1() {

        let posicaoX = parseInt(inimigo1.css("left"));
        inimigo1.css("left",posicaoX-velInimigo1);
            
        if (posicaoX <= 0) {
            somResgate.play();
            pontos -= 100;
            inimigo1.css("left",1150);
        }

    }

    function moveInimigo2() {

        let posicaoX = parseInt(inimigo2.css("left"));
        inimigo2.css("left",posicaoX-velInimigo2);

        if (posicaoX <= 0) {
            somResgate.play();
            pontos -= 100;
            inimigo2.css("left",1150);
        }

    }

    function moveInimigo3() {

        let posicaoX = parseInt(inimigo3.css("left"));
        inimigo3.css("left",posicaoX-velInimigo3);

        if (posicaoX <= 0) {
            somResgate.play();
            pontos -= 100;
            inimigo3.css("left",1150);
        }

    }

    function disparo() {
	
        if (podeAtirar === true) { 
            somDisparo.play();
            podeAtirar = false;
            let topo = parseInt($("#jogador").css("top"));
            let posicaoX = parseInt($("#jogador").css("left"));
            let tiroX = posicaoX + 250;
            let topoTiro = topo + 95;
            $("#fundoDoJogo").append("<div id='disparo'></div");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);
            var tempoDisparo = window.setInterval(executaDisparo, 30);
        }
     
        function executaDisparo() {
            let posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
                if (posicaoX > 1180) {      
                    window.clearInterval(tempoDisparo);
                    tempoDisparo = null;
                    $("#disparo").remove();
                    podeAtirar = true;      
                }
        }

    }

    function realocarInimigo1() {
        inimigo1.css("left",1150);
        inimigo1.css("top",66);
        velInimigo1 = parseInt(Math.random() * (10-2) + 2);
    }

    function realocarInimigo2() {
        inimigo2.css("left",1150);
        inimigo2.css("top",327);
        velInimigo2 = parseInt(Math.random() * (10-2) + 2);
    }

    function realocarInimigo3() {
        inimigo3.css("left",1150);
        inimigo3.css("top",588);
        velInimigo3 = parseInt(Math.random() * (10-2) + 2);
    }

    function explosao1(inimigo1X,inimigo1Y) {

        $("#fundoDoJogo").append("<div id='explosao1'></div");
        let div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;  
        }

    }

    function explosao2(inimigo2X,inimigo2Y) {

        $("#fundoDoJogo").append("<div id='explosao2'></div");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
        
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;      
        }  

    }

    function explosao3(inimigo3X,inimigo3Y) {

        $("#fundoDoJogo").append("<div id='explosao3'></div");
        var div3 = $("#explosao3");
        div3.css("top", inimigo3Y);
        div3.css("left", inimigo3X);
        div3.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao3 = window.setInterval(removeExplosao3, 1000);
        
        function removeExplosao3() {
            div3.remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;      
        } 

    }

    function colisao() {

        let colisao1 = (jogador.collision(inimigo1));
        let colisao2 = (jogador.collision(inimigo2));
        let colisao3 = (jogador.collision(inimigo3));
        let colisao4 = ($("#disparo").collision(inimigo1));
        let colisao5 = ($("#disparo").collision(inimigo2));
        let colisao6 = ($("#disparo").collision(inimigo3));
        
        if (colisao1.length > 0) {
            somExplosao.play();
            energiaAtual--;
            let inimigo1X = parseInt(inimigo1.css("left"));
            let inimigo1Y = parseInt(inimigo1.css("top"));
            explosao1(inimigo1X,inimigo1Y);
            realocarInimigo1();
        }

        if (colisao2.length > 0) {
            somExplosao.play();
            energiaAtual--;
            let inimigo2X = parseInt(inimigo2.css("left"));
            let inimigo2Y = parseInt(inimigo2.css("top"));
            explosao2(inimigo2X,inimigo2Y);
            realocarInimigo2();
        }

        if (colisao3.length > 0) {
            somExplosao.play();
            energiaAtual--;
            let inimigo3X = parseInt(inimigo3.css("left"));
            let inimigo3Y = parseInt(inimigo3.css("top"));
            explosao3(inimigo3X,inimigo3Y);
            realocarInimigo3();
        }

        if (colisao4.length > 0) {
            somExplosao.play();
            pontos += 100;
            let inimigo1X = parseInt(inimigo1.css("left"));
            let inimigo1Y = parseInt(inimigo1.css("top"));
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",1250);
            realocarInimigo1();
        }

        if (colisao5.length > 0) {
            somExplosao.play();
            pontos += 100;
            let inimigo2X = parseInt(inimigo2.css("left"));
            let inimigo2Y = parseInt(inimigo2.css("top"));
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",1250);
            realocarInimigo2();
        }

        if (colisao6.length > 0) {
            somExplosao.play();
            pontos += 100;
            let inimigo3X = parseInt(inimigo3.css("left"));
            let inimigo3Y = parseInt(inimigo3.css("top"));
            explosao3(inimigo3X,inimigo3Y);
            $("#disparo").css("left",1250);
            realocarInimigo3();
        }

    }

    function gameOver() {
        musica.pause();
        somGameover.play();
        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#inimigo3").remove();
        
        $("#fundoDoJogo").append("<div id='fim'></div>");
        
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + 
        "<p>Seu Record é: " + record + "</p>" + 
        "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
    }

    function energia() {
		if (energiaAtual === 3) {
            $("#fundoDoJogo").append("<div id='energia3'></div>");
		}
	
		if (energiaAtual === 2) {
            $("#energia3").remove();
            $("#fundoDoJogo").append("<div id='energia2'></div>");
		}
	
		if (energiaAtual === 1) {
            $("#energia2").remove();
            $("#fundoDoJogo").append("<div id='energia1'></div>");
		}
	
		if (energiaAtual === 0) {
            $("#energia1").remove();
            $("#fundoDoJogo").append("<div id='energia'></div>");
            if(pontos > record){
                record = pontos;
            }
			gameOver();
		}
	}

    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + " Record: " + record + "</h2>");
    }

    function loop() {
	    moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveInimigo3();
        colisao();
        energia();
        placar();
	}

    jogo.timer = setInterval(loop,30);

}
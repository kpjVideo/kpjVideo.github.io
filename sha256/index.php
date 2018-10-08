<?php
	// stuff
?>

<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=0.2">

	<!-- JQuery -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<!-- Bootstrap tooltips -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
	<!-- Bootstrap core JavaScript -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>
	<!-- MDB core JavaScript -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.11/js/mdb.min.js"></script>


	<!-- Font Awesome -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<!-- Bootstrap core CSS -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
	<!-- Material Design Bootstrap -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.11/css/mdb.min.css" rel="stylesheet">

	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
	
	<link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css">
	<link rel="stylesheet" href="custom.css">

	<title>SHA-256 Animation</title>
</head>
<body>
	<br>
	<center><h2>SHA-256 Animation</h2></center>
	<br>
	<div class="jumbotron">
		<div class="row">
			<div class="col-lg-8">
				<label for="data">Enter Input Data:</label>
				<textarea class="form-control inputData" id="data" rows="6"></textarea>
			</div>
			<div class="col-lg-4" style="white-space: nowrap;">
				<label for="radio">Data Type:</label>
				<br>
				<div class="custom-control custom-radio">
					<input type="radio" class="custom-control-input" id="dataBinary" name="dataTypes">
					<label class="custom-control-label" for="dataBinary">Binary (string)</label>
				</div>
				<div class="custom-control custom-radio">
					<input type="radio" class="custom-control-input" id="dataHex" name="dataTypes">
					<label class="custom-control-label" for="dataHex">Hexadecimal (base16)</label>
				</div>
				<div class="custom-control custom-radio">
					<input type="radio" class="custom-control-input" id="dataDec" name="dataTypes">
					<label class="custom-control-label" for="dataDec">Decimal (base10)</label>
				</div>
				<br>
				<label for="range">Clock Speed:</label>
				<br>
				<input type="range" class="custom-range sSpeed" min="0" max="50" step="0.5" value="20" id="sSpeed">
				<br>
				<!--<button type="button" class="btn btn-mdb-color" id="reset" style="display: inline-block;width: 48%">Reset</
				button>-->
			</div>
			<button type="button" class="btn btn-mdb-color" id="start" style="margin-top:20px;margin-bottom: 0px;width: 100%">Start</button>
		</div>
	</div>
	<div class="jumbotron" style="display: inline-table;margin-right:0px;">
		<div class="row">
			<div class="col-lg-12">
				<center>
					<h4>Variables</h4>
					<span class="textBlock" style="width:fit-contents;border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;A&nbsp;
					</span>
					<span class="textBlock varA" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;B&nbsp;
					</span>					
					<span class="textBlock varB" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;C&nbsp;
					</span>					
					<span class="textBlock varC" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;D&nbsp;
					</span>					
					<span class="textBlock varD" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;E&nbsp;
					</span>						
					<span class="textBlock varE" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;F&nbsp;
					</span>						
					<span class="textBlock varF" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;G&nbsp;
					</span>						
					<span class="textBlock varG" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;H&nbsp;
					</span>						
					<span class="textBlock varH" id="target" style="margin-bottom: 10px;">
						0x00000000
					</span>
				</center>
			</div>
		</div>
	</div>
	<div class="jumbotron" style="display: inline-block;float:right;margin-left:0px;margin-right:15%;">
		<div class="row">
			<div class="col-lg-12">
				<center>
					<h4 class="mSch">Message Scheduler</h4>
					<span class="textBlock m0" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m1" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m2" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m3" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m4" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m5" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m6" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m7" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m8" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m9" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m10" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m11" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m12" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m13" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m14" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m15" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m16" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m17" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m18" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m19" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m20" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m21" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m22" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m23" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m24" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m25" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m26" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m27" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m28" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m29" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m30" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m31" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m32" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m33" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m34" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m35" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m36" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m37" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m38" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m39" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m40" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m41" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m42" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m43" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m44" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m45" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m46" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m47" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m48" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m49" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m50" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m51" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m52" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m53" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m54" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m55" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock m56" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;">
						0x00000000
					</span>
					<span class="textBlock m57" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m58" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m59" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m60" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m61" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m62" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
					<span class="textBlock m63" id="target" style="border-bottom: 3px solid #2ecc71;margin-bottom: 10px;margin-left: 5px;">
						0x00000000
					</span>
				</center>
			</div>
		</div>
	</div>
	<br>
	<div class="jumbotron" style="display: inline-block;">
		<div class="row">
			<div class="col-lg-12">
				<center>
					<h4>Temp</h4>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						T1
					</span>
					<span class="textBlock t1" id="target" style="border-bottom: 3px solid #e67e22;margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						T2
					</span>
					<span class="textBlock t2" id="target" style="border-bottom: 3px solid #e67e22;margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						&nbsp;&nbsp;I&nbsp;&nbsp;
					</span>
					<span class="textBlock iter" id="target" style="border-bottom: 3px solid #ecf0f1;margin-bottom: 10px;">
						0x00000000
					</span>
				</center>
			</div>
		</div>
	</div>
	<div class="jumbotron" style="display: inline-block;margin-left: 0px;margin-right:15%;float:right;">
		<div class="row">
			<div class="col-lg-12">
				<center>
					<h4>Operations</h4>
					<span class="textBlock S0" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						Σ0
					</span>
					<span class="textBlock S0_data" id="target" style="border-bottom: 3px solid #9b59b6;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="textBlock s0" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						σ0
					</span>
					<span class="textBlock s0_data" id="target" style="border-bottom: 3px solid #9b59b6;margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock S1" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						Σ1
					</span>
					<span class="textBlock S1_data" id="target" style="border-bottom: 3px solid #9b59b6;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="textBlock s1" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						σ1
					</span>
					<span class="textBlock s1_data" id="target" style="border-bottom: 3px solid #9b59b6;margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<span class="textBlock Ch" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						Ch
					</span>
					<span class="textBlock ch_data" id="target" style="border-bottom: 3px solid #9b59b6;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="textBlock Mj" style="border-bottom: 3px solid #bfbfbf;margin-bottom: 10px;">
						Mj
					</span>
					<span class="textBlock mj_data" id="target" style="border-bottom: 3px solid #9b59b6;margin-bottom: 10px;">
						0x00000000
					</span>
				</center>
			</div>
		</div>
	</div>
	<br>
	<div class="jumbotron" style="display: inline-block;width: 70%;margin-left:15%;margin-right: 15%;float:left;">
		<div class="row">
			<div class="col-lg-12">
				<center>
					<h4>Result</h4>
					<span class="textBlock res0" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res1" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res2" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res3" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res4" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res5" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res6" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					&nbsp;&nbsp;
					<span class="textBlock res7" id="target" style="border-bottom: 3px solid #e74c3c;margin-bottom: 10px;">
						0x00000000
					</span>
					<br>
					<br>
					<div class="card" style="background: #222222;">
						<div class="card-body lowPadding">
							<code class="language-hex finalHash" data-lang="hex"></code>
						</div>
					</div>
				</center>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="sha256.js"></script>
	<script type="text/javascript">


		$( "#start" ).click(function(){
			$("#start").attr("disabled", true);
			changeText( '.finalHash', "" );

			messageScheduler( $(".inputData").val() );
			/*$( ".textBlock" ).each(function( index ) {
				var obj = $(this);
				obj.removeClass( "blinking" );

				setTimeout(function(){
					obj.addClass( "blinking" );
				},1);
			});*/
			//changeText( $( ".s1_data" ), "0x4A4BFF22" );
			//changeText( $( ".s0_data" ), "0x39CC301A" );
			//changeText( $( ".S1_data" ), "0xFF9322AB" );
			//changeText( $( ".S0_data" ), "0xFAC221A1" );
		});
	</script>
</body>
</html>
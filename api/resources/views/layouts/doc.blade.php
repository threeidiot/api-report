<html xmlns="http://www.w3.org/1999/html">
<head>
  <meta charset="utf-8">
  <title>{{ $api_path }}</title>

  <style type="text/css">
    body {
      padding: 10px 30px;
      font-size: 14px;
      line-height: 20px;
    }

    a {
      color: #e51f5b;
      text-decoration: none;
      outline: none;
    }

    a:hover {
      color: #fb608f;
      outline: 0;
    }

    .submit {
      height: 27px;
      width: 100px;
      margin-top: 10px;
    }

    form div {
      height: 40px;
    }

    form div input {
      margin-left: 30px;
    }

    .require {
      color: red;
    }

    hr {
      border-top: 1px solid #eee;
      border-bottom: 1px dashed #fff;
    }
  </style>
</head>

<body>

<h3>接口名称: {{ $api_name }}</h3>

<h3>接口路径: <span>GET</span> {{ $api_path }} </h3>

<div class="container">
  <form method="get" action="{{ $api_path }}" enctype='multipart/form-data'>

    @yield('content')

    <hr/>

    <div>
      <input name="t" value="37489327593"/>
      <label>t 时间戳</label>
    </div>

    <input type="submit" class="submit" value="点击测试">
  </form>

  <hr>

  <p>返回值解释 : </p>
  <pre>
@yield('result')
  </pre>
</div>

</body>
</html>

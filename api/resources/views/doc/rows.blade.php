<html xmlns="http://www.w3.org/1999/html">

<head>
  <meta charset="utf-8">
  <title>API Report 文档</title>
  <style type="text/css">
    body { padding: 10px 30px; font-size: 14px; line-height: 20px; }
    a { color: #e51f5b; text-decoration: none; outline: none; }
    a:hover { color: #fb608f; outline: 0; }
    form div { height: 40px; }
    form div input { margin-left: 30px; }
    .del { text-decoration: line-through; }

  </style>
</head>
<body>

<h2>API Report 文档</h2>

<h4>项目</h4>
<ul>
  <li><a href="/doc/project/rows">项目列表</a></li>
  <li><a href="/doc/project/edit">项目编辑和添加</a></li>
</ul>

<p>建议在游览器中使用 json 解析插件: JsonView (格式化并高亮 json)</p>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery@3.3.1/dist/jquery.slim.min.js"></script>
<script type="text/javascript">
  $(function () {
    $('li a').on('click', function () {
      var _this = $(this);
      var _text = _this.text();
      var _url = _this.attr('href');
      _this.attr('href', _url + '?api_name=' + _text);
    });
  });
</script>
</body>
</html>


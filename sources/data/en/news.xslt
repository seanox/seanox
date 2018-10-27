<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <header>
      <h1>{{Messages['news.title']}}</h1>
    </header>
    <article>
      <xsl:for-each select="news/entry[position() &lt;= 5]">
        <xsl:sort select="date" order="descending"/>
        <div>
          <div>
            <div>
              <xsl:value-of select="substring(date, 9, 2)"/>
            </div>
          </div>
          <div>
            <div>
              {{Messages['calendar.month.<xsl:value-of select="substring(date, 6, 2)"/>.title']}}
            </div>
            <div>
              <xsl:value-of select="substring(date, 1, 4)"/>
            </div>
          </div>
          <div>
            <h2 escaping="on">
              <xsl:value-of select="title"/>
            </h2>
            <p escaping="{text/@escaping}">
              <xsl:value-of select="text"/>
            </p>
          </div>
        </div>
      </xsl:for-each>
    </article>
  </xsl:template>
</xsl:stylesheet>